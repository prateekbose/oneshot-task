export interface College {
  id: Number;
  name: string;
  year_founded: Number;
  city: string;
  state: string;
  country: string;
  no_of_students: string;
  courses: Array<string>;
}

export interface Student {
  id: Number;
  name: string;
  year_of_batch: Number;
  college_id: string;
  skills: Array<string>;
}
