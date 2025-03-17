import { createWriteStream } from "fs";
import supabase from "./storage";
import { randomInt } from "crypto";
import HTTPError from "../utils/HTTPError";

class SupabaseStorage {
	constructor(opts = "") {
		this.getDestination = opts.destination || this.getDestination;
	}

	getDestination(req, file, cb) {
		const path = randomInt(10000) + "-" + file.originalname;
		cb(null, path);
	}

	_handleFile = function (req, file, cb) {
		this.getDestination(req, file, async function (err, path) {
			if (err) return cb(err);

			const chunks = [];
			file.stream.on("data", (data) => {
				chunks.push(data);
			});

			let fileData;
			file.stream.on("end", async () => {
				fileData = Buffer.concat(chunks);
				const { data, error } = await supabase.storage
					.from("files")
					.upload(path, fileData, {
						cacheControl: "3600",
						upsert: false,
					});

				if (error) {
					throw new HTTPError(error.code, error.message);
				}

				if (data) {
					cb(null, {
						path: data.path,
						size: fileData.length,
					});
				}
			});
		});
	};

	_removeFile = async function (req, file, cb) {
		const { data, error } = await supabase.storage
			.from("files")
			.remove([file.path]);

		if (error) {
			throw new Error(error);
		}
	};
}

const supabaseStorage = new SupabaseStorage();

export default supabaseStorage;
