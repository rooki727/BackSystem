package com.example.jaWeb;

import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/UpdataGoal")
public class UpdataGoal extends HttpServlet {
    public void doGet(HttpServletRequest request,HttpServletResponse response) throws IOException {
        String name=request.getParameter("username");
        String time=request.getParameter("time");
        String level=request.getParameter("selectedLevel");
        JDBC.editGoal(name,level,time);
        PrintWriter out=response.getWriter();
        out.print(name);
        out.flush();
    }

    public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException {
        doGet(request,response);
    }
}
