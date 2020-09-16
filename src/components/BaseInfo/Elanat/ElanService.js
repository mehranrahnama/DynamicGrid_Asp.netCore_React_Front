import {
  apiUrl
} from "../../../config.json";
import http from "../../../services/httpService";



const apiEndpoint = apiUrl + "/Elanats";

function elanatUrl(id) {
  return `${apiEndpoint}/${id}`;
}

function elanatDeleteUrl(id) {
  return `${apiEndpoint + "/DeleteElanat"}/${id}`;
}


export function GetAll(pageNum , pageSize ,  expression="", 
sortBy="" , sortMethod="asc") 
{
  let p = new URLSearchParams();
  p.append('pageNum', pageNum || 1);
  p.append('pageSize', pageSize || 10);
  p.append('expression', expression || "");
  p.append('sortBy', sortBy || 1);
  p.append('sortMethod', sortMethod || "asc");

  return http.get(apiEndpoint + "/GetAllElanats?" + p );

}

export function UpdateElanat() {

  return http.get(apiEndpoint + "/UpdateElanat");
}

export function getElanat(id) {
 // console.log('elanatId getElanat :' +  id);
  let p = new URLSearchParams();
  p.append('id', id || 0);
 
  return http.get(apiEndpoint + "/GetElanatById?" + p );
}

export function saveElanat(elanat) {
  if (elanat.id) {
    return http.put(UpdateElanat(elanat.id), elanat);
  }

  return http.post(apiEndpoint+ "/CreateElanat", elanat);
}

export function deleteElanat(elanatId) {
  return http.delete(elanatDeleteUrl(elanatId));
}


export default {
  GetAll,
  deleteElanat,
  saveElanat,
  getElanat
  }
