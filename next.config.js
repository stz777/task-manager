/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/api/tasks/create', // Замените на свой путь API
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: process.env.CRM_ADDRESS, // Замените на нужный вам источник
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST, PUT, DELETE, OPTIONS', // Замените на нужные вам методы
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-Requested-With, Authorization, Content-Type, Accept', // Замените на нужные вам заголовки
                    },
                ],
            },
        ];
    },
}

module.exports = nextConfig
