class FetchWrapper {
    async request(url: string, options: RequestInit): Promise<any> {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Ошибка при выполнении запроса: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    }
}

export class GetWrapper extends FetchWrapper {
    async get(url: string): Promise<any> {
        return await this.request(url, {
            method: 'GET'
        });
    }
}

export class PostWrapper extends FetchWrapper {
    async post(url: string, data: any): Promise<any> {
        return await this.request(url, {
            method: 'POST',
            body: data
        });
    }
}
