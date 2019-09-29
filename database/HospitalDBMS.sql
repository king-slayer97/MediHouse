use hospital

/*............... Drop Tables ............... */
drop table salary
drop table doctors
drop table patients
drop table dbo.admin
drop table nurse
drop table users
drop table history
drop table rooms
drop table ward_boy

/*............... Select Statment ............... */
select * from doctors 
select * from patients 
select * from dbo.admin
select * from nurse
select * from users
select * from history
select * from rooms
select * from ward_boy


/*............... Create Tables ............... */

create table nurse (
nurse_id int identity(1,1) primary key  ,
first_name varchar(20) ,
last_name varchar(20) ,
phone char(12) ,
salary decimal(10,2),
address varchar(40),

)

create table doctors (
doctor_id int identity(1,1) primary key ,
first_name varchar(20) ,
last_name varchar(20) ,
spc varchar(30) ,
phone char(12) ,
salary decimal(10,2),
address varchar(40),
arrival time ,
leave time 
)

create table patients (
patient_id int ,
first_name varchar(20) ,
last_name varchar(20) ,
phone char(12) ,
address varchar(40),
doctor_id int ,
nurse_id int ,
primary key (patient_id),
FOREIGN KEY (doctor_id)
REFERENCES doctors(doctor_id)
ON DELETE SET NULL,
FOREIGN KEY (nurse_id)
REFERENCES nurse(nurse_id)
ON DELETE SET NULL
)

create table admin (
admin_id int ,
first_name varchar(20) ,
last_name varchar(20) ,
phone char(12) ,
address varchar(40),
primary key (admin_id)
)

create table ward_boy (
ward_id int identity(1,1) primary key ,
first_name varchar(20) ,
last_name varchar(20) ,
phone char(12) ,
salary decimal(10,2),
address varchar(40),

)

create table rooms (
room_id int identity(1,1) ,
type varchar(20) ,
patient_id int ,
primary key (room_id,type),
  FOREIGN KEY (patient_id)
  REFERENCES patients(patient_id)
  ON DELETE SET NULL
)


create table history (
patient_id int ,
date_enter datetime ,
date_leave datetime ,
disease varchar(30),
treatment varchar(30),
chronic tinyint,
bill decimal(10,2),
FOREIGN KEY (patient_id)
  REFERENCES patients(patient_id)
  ON DELETE SET NULL
)



create table users (
name varchar(20),
password varchar(20),
e_mail varchar(60),
doctor_id int ,
patient_id int,
nurse_id int ,
admin_id int ,
primary key (e_mail),
FOREIGN KEY (doctor_id)
  REFERENCES doctors(doctor_id)
  ON DELETE cascade,
FOREIGN KEY (nurse_id)
  REFERENCES nurse(nurse_id)
  ON DELETE cascade,
FOREIGN KEY (admin_id)
  REFERENCES admin(admin_id)
  ON DELETE cascade,
FOREIGN KEY (patient_id)
  REFERENCES patients(patient_id)
  ON DELETE cascade
)



/*............... Insert Into Tables ............... */

select * from doctors 
insert into doctors values('Ammar', 'Ahmed', 'Heart disease', '000', 10000,'Mahala', '8:00', '1:00');
insert into doctors values('Abdelrahman', 'Salim', 'Hepatology', '000', 100000,'Tanta', '8:00', '12:00');
insert into doctors values('Sallam', 'Ahmed', 'Huntington', '000', 1000,'santa', '8:00', '1:00');
insert into doctors values('Ahmed', 'Nassar', 'Dental', '000', 10, 'Tanta', '8:00', '12:00');
insert into doctors values('Mahmoud', 'Youssef', 'Ophthalmology', '000', 100000,'Tanta', '8:00', '12:00');
insert into doctors values('Hamada', 'Seleim', 'Otology', '000', 100000,'Tanta', '8:00', '12:00');
insert into doctors values('Mohammed', 'Mahmoud', 'Heart disease', '000', 100000,'Tanta', '8:00', '12:00');
insert into doctors values('Hamza', 'Younes', 'Hepatology', '000', 100000,'Tanta', '8:00', '12:00');
insert into doctors values('Mahmoud', 'Essam', 'Heart disease', '000', 100000,'Tanta', '8:00', '12:00');
insert into doctors values('Mahmoud', 'Samy', 'Dental', '000', 100000,'Tanta', '8:00', '12:00');
insert into doctors values('ahmed', 'Samy', 'Dental', '000', 100000,'Tanta', '8:00', '12:00');

select * from users
insert into users values('Ammar', '123', 'Ammar@tanta.eg', 1, NULL, NULL, NULL);
insert into users values('Abdelrahman', '321', 'Abdelrahman@tanta.eg', 2, NULL, NULL, NULL);
insert into users values('Sallam', '111', 'Sallam@tanta.eg', 3, NULL, NULL, NULL);
insert into users values('Ahmed', '000', 'Ahmed@tanta.eg', 4, NULL, NULL, NULL);
insert into users values('Mahmoud', '222', 'Mahmoud@tanta.eg', 5, NULL, NULL, NULL);
insert into users values('Hamada', '333', 'Hamada@tanta.eg', 6, NULL, NULL, NULL);
insert into users values('Mohammed', '213', 'Mohammed@tanta.eg', 7, NULL, NULL, NULL);
insert into users values('Hamza', '312', 'Hamza@tanta.eg', 8, NULL, NULL, NULL);
insert into users values('Mahmoud', '132', 'Mahmoudes@tanta.eg', 9, NULL, NULL, NULL);
insert into users values('Mahmoud', '012', 'MahmoudYo@tanta.eg', 10, NULL, NULL, NULL);


select * from nurse
insert into nurse values( 'hanen', 'Ahmed', '000', 500,'Mahala');
insert into nurse values('gehad', 'Ahmed', '000', 50,'Nefia');
insert into nurse values( 'salma', 'Ahmed', '000',600,'Nefia');
insert into nurse values( 'shahenda', 'Ahmed', '000', 1000,'Mansoura');
insert into nurse values( 'asmaa', 'Ahmed', '000', 1200,'Mahala');
insert into nurse values( 'hala', 'Ahmed', '000', 1600,'Cairo');
insert into nurse values( 'menna', 'Ahmed', '000', 200,'Tanta');
insert into nurse values( 'eman', 'Ahmed', '000', 300,'Tanta');
insert into nurse values( 'hasnaa', 'Ahmed', '000', 30000,'Tanta');
insert into nurse values( 'bosaina', 'Ahmed', '000', 3000,'Tanta');


select * from users
insert into users values('hanen', '123', 'hanen@tanta.eg', NULL, NULL, 1, NULL);
insert into users values('gehad', '123', 'gehad@tanta.eg', NULL, NULL, 2, NULL);
insert into users values('salma', '123', 'salma@tanta.eg', NULL, NULL, 3, NULL);
insert into users values('shahenda', '123', 'shahenda@tanta.eg', NULL, NULL, 4, NULL);
insert into users values('asmaa', '123', 'asmaa@tanta.eg', NULL, NULL, 5, NULL);
insert into users values('hala', '123', 'hala@tanta.eg', NULL, NULL, 6, NULL);
insert into users values('menna', '123', 'menna@tanta.eg', NULL, NULL, 7, NULL);
insert into users values('eman', '123', 'eman@tanta.eg', NULL, NULL, 8, NULL);
insert into users values('hasnaa', '123', 'hasnaa@tanta.eg', NULL, NULL, 9, NULL);
insert into users values('bosina', '123', 'bosaina@tanta.eg', NULL, NULL, 10, NULL);



select * from ward_boy
insert into ward_boy values( 'Hussein', 'Ahmed', '000', 500,'Mahala');
insert into ward_boy values( 'Khaled', 'Ahmed', '000', 5000,'Nefia');
insert into ward_boy values( 'Ahmed', 'Ahmed', '000',600,'Nefia');
insert into ward_boy values( 'Shady', 'Ahmed', '000', 1000,'Mansoura');
insert into ward_boy values( 'Eslam', 'Ahmed', '000', 100,'Mahala');


--no ward boys in users


select * from admin

insert into admin values(1, 'Tawfeek', 'Ahmed', '000', 'Mahala');
insert into admin values(2, 'hassan', 'ahmed', '000', 'Nefia');
insert into admin values(3, 'hassaneen', 'Ahmed', '000', 'Nefia');


select * from users
insert into users values('Tawfeek', '123', 'Tawfeek@tanta.eg', NULL, NULL, NULL, 1);
insert into users values('hassan', '123', 'hassan@tanta.eg', NULL, NULL, NULL, 2);
insert into users values('hassaneen', '123', 'hassaneen@tanta.eg', NULL, NULL, NULL, 3);



select * from patients
insert into patients values(1, 'A', 'Ahmed', '000', 'Mahala', 1, 1);
insert into patients values(2, 'B', 'Ahmed', '000', 'Mansoura', 2, 2);
insert into patients values(3, 'C', 'Ahmed', '000', 'Mahala', 3, 3);
insert into patients values(4, 'D', 'Ahmed', '000', 'Mansoura', 4, 4);
insert into patients values(5, 'E', 'Ahmed', '000', 'Mahala', 5, 5);
insert into patients values(6, 'F', 'Ahmed', '000', 'Mansoura', 6, 6);
insert into patients values(7, 'G', 'Ahmed', '000', 'Mahala', 7, 7);
insert into patients values(8, 'H', 'Ahmed', '000', 'Mansoura', 8, 8);
insert into patients values(9, 'I', 'Ahmed', '000', 'Mahala', 9, 9);
insert into patients values(10, 'J', 'Ahmed', '000', 'Mansoura', 10,10);

insert into patients values(11, 'AA', 'Ahmed', '000', 'Mahala', 3, 5);
insert into patients values(12, 'BB', 'Ahmed', '000', 'Mansoura', 6, 3);
insert into patients values(13, 'CC', 'Ahmed', '000', 'Mahala', 8, 7);
insert into patients values(14, 'DD', 'Ahmed', '000', 'Mansoura', 9, 10);
insert into patients values(15, 'EE', 'Ahmed', '000', 'Mahala', 1, 4);
insert into patients values(16, 'FF', 'Ahmed', '000', 'Mansoura', 2, 6);
insert into patients values(17, 'GG', 'Ahmed', '000', 'Mahala', 4, 7);
insert into patients values(18, 'HH', 'Ahmed', '000', 'Mansoura', 10, 8);
insert into patients values(19, 'II', 'Ahmed', '000', 'Mahala', 9, 9);
insert into patients values(20, 'JJ', 'Ahmed', '000', 'Mansoura', 5,1);


insert into users values ('Ahmed','123','ahmedss@gmail.com',NULL,11,NULL,NULL)


select * from history



select * from history
insert into history values(1, 1, 3, 'heart', 'barastamol', 0, 1000.0);
insert into history values(2, 2, 4, 'OBSTETRICS', 'barastamol', 1, 100.0);
insert into history values(3, 4, 5, 'GYNECOLOGY', 'barastamol', 0, 100.0);
insert into history values(4, 1, 9, 'OPHTHALMOLOGY', 'barastamol', 1, 700.0);
insert into history values(5, 1, 3, 'Abdominal aortic aneurysm', 'barastamol', 0, 900.0);
insert into history values(6, 1, 3, 'Adhesive', 'barastamol', 0, 700.0);
insert into history values(7, 1, 3, 'Adolescent', 'barastamol', 0, 1000.0);
insert into history values(8, 1, 3, 'Adrenal', 'barastamol', 0, 900.0);
insert into history values(9, 1, 3, 'Alcohol addiction', 'barastamol', 0, 600.0);
insert into history values(10, 1, 3, 'Aldosteronoma', 'barastamol', 0, 1000.0);
insert into history values(11, 1, 3, 'radiation', 'barastamol', 0, 600.0);
insert into history values(12, 1, 3, 'heart', 'barastamol', 0, 500.0);
insert into history values(13, 1, 3, 'heart', 'barastamol', 0, 400.0);
insert into history values(14, 1, 3, 'heart', 'barastamol', 0, 300.0);
insert into history values(15, 1, 3, 'heart', 'barastamol', 0, 200.0);
insert into history values(16, 1, 3, 'heart', 'barastamol', 0, 100.0);
insert into history values(17, 1, 3, 'heart', 'barastamol', 1, 150.0);
insert into history values(18, 1, 3, 'heart', 'barastamol', 1, 1900.0);
insert into history values(19, 1, 3, 'heart', 'barastamol', 1, 2000.0);
insert into history values(20, 1, 3, 'heart', 'bills', 0, 100.0);

