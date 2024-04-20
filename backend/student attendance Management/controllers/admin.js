const Attendance=require('../models/attendance');

exports.getReq= async (req, res) => {
    try {
        let joeCount=0;
        let mayaCount=0;
        let jayaCount=0;
        let maieCount=0;
        let dates=0;

        const allAttendance = await Attendance.findAll();
        
        allAttendance.forEach(record => {
            dates++;
            const { joe, maya, jaya, maie } = record;
            if (joe) {
                joeCount++;
            } 
            if (maya) {
                mayaCount++;
            } 
            if (jaya) {
                jayaCount++;
            } 
            if (maie) {
                maieCount++;
            }
        });

        const attendanceSummary = {
            dates:dates,
            joe: joeCount,
            maya: mayaCount,
            jaya: jayaCount,
            maie: maieCount
        };

        res.status(200).json(attendanceSummary);
    } catch (error) {
        console.error('Error getting attendance:', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.postReq= async (req, res) => {
    const { date,  attendance} = req.body;
    try {
        let attendanceRecord = await Attendance.findOne({ where: { date } });
        if (!attendanceRecord) {
            attendanceRecord = await Attendance.create({ date });
        }
        attendance.forEach(async (attendance) => {
            const name= attendance.name
            const status=attendance.attendance
            attendanceRecord[name] = status === 'present';
        });

        const response=await attendanceRecord.save();
        res.status(201).json(response.dataValues);
    } catch (error) {
        console.error('Error updating attendance:', error);
        res.status(500).send('Internal Server Error');
    }
}