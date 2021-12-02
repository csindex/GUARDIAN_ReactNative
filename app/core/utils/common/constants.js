const BASE_URL_BASE = 'http://10.128.50.136';//'http://10.128.50.136';
export const BASE_URL = `${BASE_URL_BASE}:3000`;
export const BASE_URL_IMG = `${BASE_URL_BASE}:5000`;

export const API_KEY = 'AIzaSyB5kr_zwaIKrEERf3SRKYhwzoDpFLZ4Zgw';

export const IS_AUTHENTICATED_KEY = 'KEY_GUARDIAN_IS_AUTHENTICATED';
export const EMAIL_KEY = 'KEY_GUARDIAN_EMAIL';
export const TOKEN_KEY = 'KEY_GUARDIAN_TOKEN';

export const Gender = {
    '0' : '* Gender',
    'Male' : 'Male',
    'Female' : 'Female',
    'LGBT' : 'LGBTQ+',
};
export const CivilStatus = {
    '0' : '* Civil Status',
    'Single' : 'Single',
    'Married' : 'Married',
    'Widowed' : 'Widowed',
    'Separated' : 'Separated',
};
export const RStatus = {
    '0' : '* Responder Status',
    'Dispatch' : 'Emergency Dispatch Operator',
    'QRT' : 'Quick Response',
    'EMS' : 'Emergency Medical Services',
    'Traffic Dept.' : 'Traffic Enforcer',
    'Fireman' : 'Firefighter',
    'LGU Frontliner' : 'LGU Frontliner',
    'Policeman' : 'Police Officer',
    'Volunteer' : 'Volunteer',
    'Military' : 'Military',
    'Others' : 'Others',
};