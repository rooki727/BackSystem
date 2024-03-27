package com.example.jaWeb.servlet;

import com.example.jaWeb.Dao.JDBC;

import java.io.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/UpdataGoal")
public class updataGoalServlet extends HttpServlet {
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
