export default function PAGE() {
    return <>
        <Calendar />
        {/* <table className="table table-bordered">
        <thead>

        </thead>
        <tbody>
            <tr>
                <td>asdas</td>
            </tr>
        </tbody>
    </table> */}

    </>
}

const Calendar = () => {
    // Получаем данные для календаря
    const calendarData = getCalendarData();

    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Пн</th>
                    <th>Вт</th>
                    <th>Ср</th>
                    <th>Чт</th>
                    <th>Пт</th>
                    <th>Сб</th>
                    <th>Вс</th>
                </tr>
            </thead>
            <tbody>
                {calendarData.map((week, index) => (
                    <tr key={index}>
                        {week.map((day, index) => (
                            <td key={index} style={{ height: 100 }}>{day}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

// Функция для получения данных календаря
const getCalendarData = () => {
    // Ваш код для получения данных календаря за октябрь 2023

    // Пример данных календаря
    const calendarData = [
        [null, null, null, null, null, null, 1],
        [2, 3, 4, 5, 6, 7, 8],
        [9, 10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21, 22],
        [23, 24, 25, 26, 27, 28, 29],
        [30, 31, null, null, null, null, null],
    ];

    return calendarData;
};


