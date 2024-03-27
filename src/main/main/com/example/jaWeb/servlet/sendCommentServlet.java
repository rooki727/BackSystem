package com.example.jaWeb.servlet;

import com.example.jaWeb.Dao.JDBC;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/sendComment")
public class sendCommentServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String name=request.getParameter("username");
        String comment=request.getParameter("comment");
        try {
            JDBC.insertComment(name,comment);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        response.setContentType("text/html;charset=UTF-8");
        StringBuffer str=JDBC.getCommentdata();
        PrintWriter out=response.getWriter();
        if (str != null) {
            out.print(str.toString());
        }
        out.flush();
    }
    public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException {
        doGet(request,response);
    }
}