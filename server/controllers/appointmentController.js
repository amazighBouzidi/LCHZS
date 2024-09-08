import moment from 'moment'
import Appointment from '../model/Appointment.model.js';

export async function getAllAppointment(req, res) {
    try {
        const { userId } = req.user;
        if (!userId) {
            return res.status(401).send({ error: "User Not Found...!" });
        }

        const currentDate = new Date();
        const fifteenDaysLater = new Date();
        fifteenDaysLater.setDate(currentDate.getDate() + 15);

        // Construct string representations in the format 'YYYY-MM-DD'
        const stringCurrentDate = currentDate.toISOString().split('T')[0];
        const stringFifteenDayAfter = fifteenDaysLater.toISOString().split('T')[0];

        // Convert the string representations back to Date objects
        const dateCurrent = moment(stringCurrentDate);
        const dateFuture = moment(stringFifteenDayAfter);

        const appointments = await Appointment.find();

        let filterAppointmentss = appointments.map((appointment) => {
            let startDate = moment(appointment.startDate)
            if(startDate.isAfter(dateCurrent) && startDate.isBefore(dateFuture)){
                return appointment
            }
        })
         let filterAppointments = filterAppointmentss.filter((appointment) => {
            if(appointment != undefined){
                return appointment
            }
        })
        //console.log("filterAppointments", filterAppointments)
        if(filterAppointments[0] !== undefined){
            res.status(200).json(filterAppointments)
        }else{
            filterAppointments = []
            res.status(200).json(filterAppointments);
        }
    } catch (error) {
        console.error('Error getting appointments:', error);
        return res.status(500).send({ error: error.message });
    }
}

export async function addAppointment(req, res) {
    try {
        const { userId } = req.user;
        if (!userId) {
            return res.status(401).send({ error: "User Not Found...!" });
        }
        const { newAppointment } = req.body
        const appointment = new Appointment({
            startDate: newAppointment.startDate,
            endDate: newAppointment.endDate,
            title: "Reserverd",
            patient: userId
        });
        await appointment.save()
        res.status(200).json({msg : "Appointment saved successfully !!"})
    } catch (error) {
        console.error('Error getting appointments:', error);
        return res.status(500).send({ error: error.message });
    }    
}
 