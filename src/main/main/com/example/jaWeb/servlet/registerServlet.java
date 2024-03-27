package com.example.jaWeb.servlet;

import com.example.jaWeb.Dao.JDBC;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/RegisterServlet")
public class registerServlet extends HttpServlet {
    public void doGet(HttpServletRequest request,HttpServletResponse response) throws IOException {
        String name=request.getParameter("username");
        String pd=request.getParameter("password");
        try {
            JDBC.insertPlayerData(name,pd);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        PrintWriter out=response.getWriter();
        out.print("successregister");
        out.flush();
    }
    public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException {
        doGet(request,response);
    }
}
