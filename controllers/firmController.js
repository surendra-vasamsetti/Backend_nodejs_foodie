const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb){
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload  = multer({ storage: storage });

const addFirm = async(req,res)=>{
    
  try {
    const {firmName, area, category, region, offer}= req.body;

    const image = req.file ? req.file.filename : undefined;

    const vendor = await Vendor.findById(req.vendorId);
    if(!vendor){
      res.status(404).json({message: "vendor not found"})
    }

    if(vendor.firm.length > 0){
      return res.status(400).json({message: "vendor can have only one firm"});
    }

    const firm = new Firm({
      firmName,
    area,
    category,
    region,
    offer,
    image,
     vendor: vendor._id
    })

    const savedFirm =await firm.save();

    const firmId = savedFirm._id

    vendor.firm.push(savedFirm)

    await vendor.save();

   
    
    return res.status(200).json({message: "firm add successfully", firmId})

  } catch (error) {
    console.error(error);
    res.status(500).json("internal server error")
  }
}

const deleteFirmById = async(req, res)=>{
  try {
    const firmId = req.params.firmId;

    const deletedProduct = await Firm.findByIdAndDelete(firmId);

    if (!deletedProduct) {
        return res.status(404).json({ error: "No product found" })
    }
    res.status(200).json({ message: "Product deleted successfully" });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" })
}
}

module.exports  = {addFirm: [upload.single('image'), addFirm], deleteFirmById}

//surendra vasamsetti . iam from angara so, i would like to thank you first once because this is my first web application using react so i want to show my self for being this project so i try to learn first iam very loss confident . i try to learn something new so i decided to learn one of the new hype technology of web dev recently .then none other than react. so i want to try home i want to try it some some raect based components. it is a multi vendor project.multi vendor projof ect this multiple data so i am taking the data from the evening. just import the data from the begining like this you never be stop. i want to complete my project very soon asap.but i haven't ant interest in this . i donot know anything what i want to do. i want do the same thing as my own will in the future. 