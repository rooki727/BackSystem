package com.example.jaWeb;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@WebServlet("/insertAdminer")
public class insertAdminer extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String name=request.getParameter("adminuname");
        String pd=request.getParameter("adminpassword");
        String action=request.getParameter("action");
        String username= (String) request.getSession().getAttribute("userlogin");
        if(name!=null&&pd!=null) {
            try {
                JDBC.insertAdminerData(name, pd);
                DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss");
                JDBC.WriteAdminer(username,dateTimeFormatter.format(LocalDateTime.now()),action);
                PrintWriter out = response.getWriter();
                out.print("successadd");
                out.flush();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }
    public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException {
        doGet(request,response);
    }
}