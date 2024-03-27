package com.example.jaWeb.servlet;

import com.example.jaWeb.Dao.JDBC;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/CheckNameadmin")
public class checkNameadminServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        if(request.getParameter("username")!=null&&!JDBC.isAdminer(request.getParameter("username"))){
            response.getWriter().write("canuse");
        }
        else {
            response.getWriter().write("nouse");
        }

    }
    public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException{
        doGet(request,response);
    }
}