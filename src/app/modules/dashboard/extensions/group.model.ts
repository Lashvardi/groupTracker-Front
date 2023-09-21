export interface Group {
  group:          GroupClass;
  session:        Session;
  alternateWeeks: AlternateWeek[];
}

export interface AlternateWeek {
  id:               number;
  weekNumbers:      string;
  lectureSessionId: number;
}

export interface GroupClass {
  companyName: string;
  groupName:   string;
  grade:       string;
  status:      number;
}

export interface Session {
  day:         string;
  time:        string;
  auditorium:  string;
  isOnline:    boolean;
  isAlternate: boolean;
}
