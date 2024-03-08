package com.kh.demo.domain.entity;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class Tester {
    private Long tester_id;              //number(10),
    private String email;                 //varchar2(50),
    private String nickname;              //varchar2(30),
    private String tesetlog;                //varchar2(12),
    private String gubun;                 //varchar2(11),
    private byte[] pic;                   //blob
    private LocalDateTime cdate;         //timestamp
    private LocalDateTime udate;         //timestamp
}
