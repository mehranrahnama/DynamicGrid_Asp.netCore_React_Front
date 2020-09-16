import {
    apiUrl
  } from "../../../config.json";
  import http from "../../../services/httpService";
  
  const apiEndpoint = apiUrl + "/Seed/";
  
  
  
  
  
  async function  GetAll(pageNum=1, pageSize=10, expression="", sortBy="",order="") {
  
    return http.get(apiEndpoint+`?pageNum=${pageNum}&pageSize=${pageSize}&Expression=${expression}&sortBy=${sortBy}&sortMethod=${order}`)
    
  }
  async function GetByCommitteeId(committeeId,pageNum=1, pageSize, expression="", sortBy="",order="asc") {
    return http.get(apiUrl+`/Committees/${committeeId}/seeds?pageNum=${pageNum}&pageSize=${pageSize}&Expression=${expression}&sortBy=${sortBy}&sortMethod=${order}`)
  }
  
  // export function UpdateElanat() {
  
  //   return http.get(apiEndpoint + "/UpdateElanat");
  // }
  
  export function GetById(id) {
    return http.get(apiEndpoint+id);
  }
  
  // export function saveElanat(elanat) {
  //   if (elanat.id) {
  //     return http.put(UpdateElanat(elanat.id), elanat);
  //   }
  
  //   return http.post(apiEndpoint, elanat);
  // }
  
  export function Delete(id) {
    return http.delete(apiEndpoint+id);
  }
  export default {
  GetAll,
  Delete,
  GetById,
  GetByCommitteeId
  }

