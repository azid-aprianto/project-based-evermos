import http from "k6/http";
import { check } from "k6";

export const options = {
    discardResponseBodies: false,
    scenarios: {
        contacts: {
            executor: 'per-vu-iterations',
            vus: 1000,
            iterations: 3500,
            maxDuration: '2s',
        },
    },
};

export default function(){
    const res = http.post('https://reqres.in/api/users');
    const checkOutput = check (
        res,
        {
            'response code was 201': (res) => res.status == 201,
        },
    );
}

