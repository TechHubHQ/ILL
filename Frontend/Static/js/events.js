document.addEventListener('DOMContentLoaded', function() {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        events: [
            {
                title: 'Session 1',
                start: '2024-01-25T10:00:00',
                end: '2024-01-25T12:00:00'
            },
            {
                title: 'Session 2',
                start: '2024-01-28T14:00:00',
                end: '2024-01-28T16:00:00'
            },
        ]
    });
});