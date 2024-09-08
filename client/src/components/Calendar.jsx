import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    DayView,
    Appointments,
    AppointmentTooltip,
    Toolbar,
    ViewSwitcher,
    DateNavigator,   
} from '@devexpress/dx-react-scheduler-material-ui';
import { getAllAppointement } from '../helper/helperCalendar';
import moment from 'moment'
import { appointmentsDisponibilite } from '../helper/appointmentsDisponibiliteGenerate'; // Import the constant
import AppointmentCard from './AppointmentCard';
import toast, { Toaster } from 'react-hot-toast';

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentViewName, setCurrentViewName] = useState('Week');
    const [appointments, setAppointments] = useState([]);
    const appointmentsDisponibilites = appointmentsDisponibilite()

    const removeAppointment = (appointmentToRemove, msg) => {
        setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment !== appointmentToRemove))
        toast.success(msg)
    }

    useEffect(() => {
        // Fetch appointments from backend
        getAllAppointement()
            .then((filterAppointments) => {
                if(filterAppointments.length === 0){
                    setAppointments(appointmentsDisponibilites)
                }else{
                    let filteredAppointmentsDisponibilite = [];
                    appointmentsDisponibilites.forEach((newApp) => {
                        let dateStart = moment(newApp.startDate);
                        let isSameDate = false;
                        filterAppointments.forEach((backApp) =>{
                           if(backApp != null){
                            let backDate = moment(backApp.startDate);
                            if(backDate.isSame(dateStart)){
                                isSameDate = true;
                            }
                           }
                        });
                        if(!isSameDate){
                            filteredAppointmentsDisponibilite.push(newApp);
                        }
                    });
                    setAppointments(filteredAppointmentsDisponibilite)
                }
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <Paper>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <Scheduler 
                data={appointments} 
                height={660}
            >
                <ViewState
                    currentDate={currentDate}
                    onCurrentDateChange={setCurrentDate}
                    currentViewName={currentViewName}
                    onCurrentViewNameChange={setCurrentViewName}
                />
                <WeekView startDayHour={9}  endDayHour={16} />
                <DayView startDayHour={9} endDayHour={16} />
                <Toolbar />
                <DateNavigator />
                <ViewSwitcher />
                <Appointments/>
                <AppointmentTooltip
                    showCloseButton
                    contentComponent={(appointment) => {
                        return (
                           <AppointmentCard 
                                data={appointment.appointmentData} 
                                onRemoveAppointment={removeAppointment} 
                            />
                        );
                    }}
                />
            </Scheduler>
        </Paper>
    );
}
