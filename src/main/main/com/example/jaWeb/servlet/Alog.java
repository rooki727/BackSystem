package com.example.jaWeb.servlet;

public class Alog {
    public String name;
    public String ttc;
    public String op;

    public Alog(String name,String ttc,String op){
        this.name=name;
        this.ttc=ttc;
        this.op=op;
    }

    public String getName(){
        return this.name;
    }

    public String getTtc(){
        return this.ttc;
    }

    public String getOp(){
        return this.op;
    }
}
