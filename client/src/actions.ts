
export enum ListType {
    first = "first",
    second = "second"
}


export function getList(list: ListType) : Promise<string[]> {
    return fetch("/api/double/" + list)
        .then(rsp => rsp.json());
}

export function postUserToList(name : string, list : string) : Promise<string[]> {
    return postJson("/api/double/" + list, {name: name})
        .then(rsp => rsp.json());
}

function postJson(url : string, payload : any) : Promise<Response> {
    return fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
}

interface DoubleSpeakerRsp {
    name: string,
    have_spoken: boolean
}

export function getSpeaker() : Promise<string> {
    return fetch("api/double")
        .then(rsp => rsp.json())
        .then(rsp => (rsp as DoubleSpeakerRsp).name)
}

export function markSpeakerAsSpoken(name : string) : Promise<Response | void> {
    return postJson("api/double", {name: name, have_spoken: true})
        .catch(err => console.log(err))
}

export function resetLists() : Promise<void> {
    return fetch("api/double", {
        method: "DELETE"
    }).then(() => {})
}