package com.example.jaWeb;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/getPlayerLog")
public class getPlayerLog extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            StringBuffer str=JDBC.PlayerLog();
            PrintWriter out=response.getWriter();
            out.print(str.toString());
            out.flush();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException {
        doGet(request,response);
    }
}

