package com.example.jaWeb;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@WebServlet("/ChangeUser")
public class ChangeUser extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String tableId=request.getParameter("tableId");
        String no = request.getParameter("no");
        String name = request.getParameter("username");
        String password = request.getParameter("password");
        String action=request.getParameter("action");
        String username= (String) request.getSession().getAttribute("userlogin");
        if(tableId!=null&&no!=null&&name!=null&&password!=null) {
            if ("expressadmin".equals(tableId)||"adminsearch".equals(tableId)) {
                System.out.println("1111");
                try {
                    JDBC.updataadminer(no, name, password);
                    DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss");
                    JDBC.WriteAdminer(username,dateTimeFormatter.format(LocalDateTime.now()),action);
                    PrintWriter out = response.getWriter();
                    out.print("successupdate");
                    out.flush();
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }
            } else if ("expressuser".equals(tableId)||"usersearch".equals(tableId)) {
                System.out.println("2222");
                try {
                    JDBC.updataplayer(no,name,password);
                    DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss");
                    JDBC.WriteAdminer(username,dateTimeFormatter.format(LocalDateTime.now()),action);
                    PrintWriter out=response.getWriter();
                    out.print("successupdate");
                    out.flush();
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }
    public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException {
        doGet(request,response);
    }
}
