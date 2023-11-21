export default async function fetchAllTasks() {
    return fetch(
        `/api/tasks/get-all-tasks`,
        {
            method: "POST",
        }
    ).then(
        response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText);
            }
        }
    ).then(data => {
        if (data.success) {
            if (!data.data) {
                // toast.error("Что-то пошло не так #dnsd3J");
            }
            return data;
        } else {
            // toast.error("Что-то пошло не так #mdna3");
        }
    })
        .catch(error => {
            const statusText = String(error);
            fetch(
                `/api/bugReport`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        text: {
                            err: "#dhhcds8",
                            data: {
                                statusText,
                                error,
                                values: {}
                            }
                        }
                    })
                }
            )
                .then(x => x.json())
                .then(x => {
                    console.log(x);
                })
        })
}