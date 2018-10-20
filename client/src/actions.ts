import {Speaker} from "models";
import {promises} from "fs";

export enum ListType {
    first = "first",
    second = "second"
}

export function getList(id : string, list: ListType): Promise<Speaker[]> {
    return fetch("/api/double/" + id + "/" + list)
        .then(rsp => rsp.json());
}

export function postUserToList(id : string, name : string, list : string) : Promise<Speaker[]> {
    return postJson("/api/double/" + id + "/" + list, {name: name})
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

export function getSpeaker(id : string) : Promise<string> {
    return fetch("/api/double/" + id)
        .then(rsp => rsp.json())
        .then(rsp => (rsp as Speaker).name)
}

export function markSpeakerAsSpoken(id : string, name : string) : Promise<Response | void> {
    return postJson("/api/double/" + id, {name: name, have_spoken: true})
        .catch(err => console.log(err))
}

export function resetLists(id : string) : Promise<void> {
    return fetch("/api/double/" + id + "/first", {
        method: "DELETE"
    }).then(() => fetch("/api/double/" + id + "/second", {
        method: "DELETE"
    }).then(() => { }));
}

interface IdRsp {
    id : string
}

export function createList() : Promise<string> {
    return postJson("/api/double/", {})
        .then(rsp => rsp.json())
        .then(rsp => (rsp as IdRsp).id)
}