const multer = require("multer");
const router = require("express").Router();
const fs = require("fs");
const ImageModel = require("../models/image");

const uploading = multer({
	dest: "../uploads",
	limits: { fileSize: 6000000, files: 1 },
});

router.post("/pictures", uploading.single("image"), (req, res) => {
	try {
		const data = { fileBuffer: fs.readFileSync(req.file.path) };
		const Image = new ImageModel(data);
		Image.save()
			.then(() => console.log("Image Saved Successfully!"))
			.catch((err) => console.log(`Error in Saving User: ${err}`));
		res.status(200);
		res.redirect("/");
	} catch (error) {
		console.log(error);
		res.send("Error: File is required/File Size Limit Exceeded [max: 5mb] <a href='/'>Click here to return</a>");
	}
});

router.get("/pictures", async (req, res) => {
	const data = await ImageModel.find();
	let newData = [];
	if (data.length > 0) {
		data.forEach((element) => {
			newData.push({
				_id: element._id,
				id: element.id,
				image: element.fileBuffer.toString("base64"),
			});
		});
		res.json(newData);
	} else {
		res.json(null);
	}
});

router.post(
	"/changePictures",
	uploading.single("changeImage"),
	async (req, res) => {
		try {
			const id = req.body.changeImageID;
			// console.log(req.body);
			const newData = { fileBuffer: fs.readFileSync(req.file.path) };
			const newImage = await ImageModel.findOneAndUpdate(
				{ id: id },
				newData
			);
            if (newImage === null) {
                res.send("Invalid ID <a href='/'>Click here to return</a>")
            } 
			res.status(200);
			res.redirect("/");
		} catch (error) {
			res.send("Error Occured: File and ID both are required/File Size Limit Exceeded [max: 5mb] <a href='/'>Click here to return</a>");
		}
	}
);

router.delete("/pictures/:id", async (req, res) => {
	try {
		const id = req.params.id;
		ImageModel.findOneAndDelete({ id: id }, (err, resq) => {
			if (err) {
				console.log(error);
			} else {
				console.log("Image Successfully Deleted");
                res.json(null);
			}
		});
	} catch (error) {
		console(error);
		res.json("Error: Invalid ID");
	}
});

module.exports = router;
