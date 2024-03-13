package com.example.jaWeb;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/CheckNameServlet")
public class CheckNameServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        if(request.getParameter("username")!=null&&!JDBC.isPlayer(request.getParameter("username"))){
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