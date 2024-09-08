export const appointmentsDisponibilite = () => {
    const appointments = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    // Function to add leading zeros if needed
    const addLeadingZero = (number) => {
        return number < 10 ? `0${number}` : `${number}`;
    };

    // Function to generate appointments for a given date
    const generateAppointmentsForDate = (year, month, day) => {
        let startHour = 9;
        let startMinute = 0;
        let endHour = 9;
        let endMinute = 40;
        
        while (endHour < 17) {
            const startDate = new Date(year, month - 1, day, startHour, startMinute);
            const endDate = new Date(year, month - 1, day, endHour, endMinute);
            appointments.push({
                startDate: `${year}-${addLeadingZero(month)}-${addLeadingZero(day)}T${addLeadingZero(startHour)}:${addLeadingZero(startMinute)}+02:00`,
                endDate: `${year}-${addLeadingZero(month)}-${addLeadingZero(day)}T${addLeadingZero(endHour)}:${addLeadingZero(endMinute)}+02:00`,
                title: 'Rendez-vous disponible'
            });
            startHour = endHour;
            startMinute = endMinute;
            endMinute += 40;
            if (endMinute >= 60) {
                endMinute -= 60;
                endHour++;
            }
        }
    };

    // Generate appointments for the next 15 days
    for (let i = 0; i < 15; i++) {
        generateAppointmentsForDate(currentYear, currentMonth, currentDay + i);
    }

    return appointments;
};

