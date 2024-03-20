const Doctor = require("../models/Doctor");
const { z } = require('zod');

const searchDoctor = async (req, res) => {
    const { search, searchBy, sortBy, sortOrder } = req.body;
    const searchBySchema = z.enum(['name', 'specialization', 'expertise', 'all']).default('all');
    const sortBySchema = z.enum(['averageRating', 'price', 'experience']).default('averageRating');
    const sortOrderSchema = z.enum(['asc', 'desc']).default('asc');
    const searchByValue = searchBySchema.parse(searchBy);
    const sortByValue = sortBySchema.parse(sortBy);
    const sortOrderValue = sortOrderSchema.parse(sortOrder);
    const searchResult = [];

    if (searchByValue === 'all' || searchByValue === 'expertise') {
        const doctorWithExpertise = await Doctor.find({
            expertise: {
                $regex: search,
                $options: 'i'
            }
        }).select('auth0_id name expertise specialization experience averageRating price').sort({ [sortByValue]: sortOrderValue });
        searchResult.push(...doctorWithExpertise);
    }

    if (searchByValue === 'all' || searchByValue === 'specialization') {
        const doctorsWithSpecialization = await Doctor.find({
            specialization: {
                $regex: search,
                $options: 'i'
            }
        }).select('auth0_id name expertise specialization experience averageRating price').sort({ [sortByValue]: sortOrderValue });
        searchResult.push(...doctorsWithSpecialization);
    }

    if (searchByValue === 'all' || searchByValue === 'name') {
        const doctorsWithName = await Doctor.find({
            name: {
                $regex: search,
                $options: 'i'
            }
        }).select('auth0_id name expertise specialization experience averageRating price').sort({ [sortByValue]: sortOrderValue });
        searchResult.push(...doctorsWithName);
    }
    const uniqueSearchResult = Array.from(new Set(searchResult));
    res.status(200).json({ doctors: uniqueSearchResult, success: true });
}

module.exports = searchDoctor;