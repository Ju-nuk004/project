--���̺����
drop table tester;
drop table product;
drop table member;

--����������
drop sequence product_product_id_seq;

---------
--��ǰ����
--------
create table product(
    product_id  number(10),
    pname       varchar(30),
    quantity    varchar(30),
    price       varchar2(2000),
    cdate       timestamp, --�����Ͻ�
    udate       timestamp  --�����Ͻ�
);
--�⺻Ű
alter table product add constraint product_product_id_pk primary key(product_id);

--����������
create sequence product_product_id_seq;

--����Ʈ
alter table product modify cdate default systimestamp; --�ü�� �Ͻø� �⺻������
alter table product modify udate default systimestamp; --�ü�� �Ͻø� �⺻������

--�ʼ� not null
alter table product modify quantity not null;
alter table product modify price not null;

--����--
insert into product(product_id,pname,quantity,price)
     values(product_product_id_seq.nextval, '��ǻ��', 5, 1000000);

insert into product(product_id,pname,quantity,price)
     values(product_product_id_seq.nextval, '�����', 5, 500000);

insert into product(product_id,pname,quantity,price)
     values(product_product_id_seq.nextval, '������', 1, 300000);
commit;



--ȸ�����̺�
create table member(
    member_id   number(10),     --���ΰ��� ���̵�
    email       varchar2(50),   --�α� ���̵�
    passwd      varchar2(12),   --�α� ��й�ȣ
    nickname    varchar2(30),   --��Ī
    gubun       varchar(11),    --default 'M0101', --ȸ������(�Ϲ�,���,������1,������2)..
    pic         blob,           --����
    cdate       timestamp,      --�����Ͻ�,������
    udate       timestamp       --�����Ͻ�
);
--�⺻Ű����
alter table member add constraint mumber_member_id_pk primary key(member_id);

--��������
alter table member modify email constraint member_email_uk unique;
alter table member modify nickname constraint member_nickname_uk unique;

--����Ʈ
alter table member modify gubun default 'M0101'; --�ü�� �Ͻø� �⺻������
alter table member modify cdate default systimestamp; --�ü�� �Ͻø� �⺻������
alter table member modify udate default systimestamp; --�ü�� �Ͻø� �⺻������

--������
drop sequence member_member_id_seq;
create sequence member_member_id_seq;

--���õ�����
insert into member (member_id,email,passwd,nickname)
    values(member_member_id_seq.nextval,'user1@kh.com','user1','�����1');
insert into member (member_id,email,passwd,nickname)
    values(member_member_id_seq.nextval,'user2@kh.com','user2','�����2');


--ȸ�����̺�
create table tester(
    tester_id   number(10),     --���ΰ��� ���̵�
    email       varchar2(50),   --�α� ���̵�
    nickname    varchar2(30),   --��Ī
    tesetlog    varchar2(2000),   --����
    pic         blob,           --����
    cdate       timestamp,      --�����Ͻ�,������
    udate       timestamp       --�����Ͻ�
);
--�⺻Ű����
alter table tester add constraint tester_tester_id_pk primary key(tester_id);

--����Ʈ
alter table tester modify cdate default systimestamp; --�ü�� �Ͻø� �⺻������
alter table tester modify udate default systimestamp; --�ü�� �Ͻø� �⺻������

--������
drop sequence tester_tester_id_seq;
create sequence tester_tester_id_seq;

commit;