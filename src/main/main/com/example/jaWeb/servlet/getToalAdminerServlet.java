package com.example.jaWeb.servlet;

import com.example.jaWeb.Dao.JDBC;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(urlPatterns = "/GetToalAdminer")
public class getToalAdminerServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String str= JDBC.getAdminerCount();
        PrintWriter out=response.getWriter();
        if(str!=null){
            out.print(str);
            out.flush();
        }

    }
    public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException {
        doGet(request,response);
    }
}

