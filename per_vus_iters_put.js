import http from "k6/http";
import { check } from "k6";

export const options = {
    discardResponseBodies: true,
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
    const res = http.put('https://reqres.in/api/users/1');
    const checkOutput = check (
        res,
        {
            'response code was 200': (res) => res.status == 200,
        },
    );
}

