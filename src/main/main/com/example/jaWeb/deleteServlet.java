package com.example.jaWeb;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@WebServlet("/deleteServlet")
public class deleteServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String tableId=request.getParameter("tableId");
        String name=request.getParameter("username");
        String action=request.getParameter("action");
        String username= (String) request.getSession().getAttribute("userlogin");
        if(tableId!=null&&name!=null) {
            if ("expressadmin".equals(tableId)||"adminsearch".equals(tableId)) {
                JDBC.DeleteAdminer(name);
                DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss");
                JDBC.WriteAdminer(username,dateTimeFormatter.format(LocalDateTime.now()),action);
                PrintWriter out = response.getWriter();
                out.print("successdetele");
                out.flush();
            }
            else if ("expressuser".equals(tableId)||"usersearch".equals(tableId)){
                JDBC.DeletePlayer(name);
                DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss");
                JDBC.WriteAdminer(username,dateTimeFormatter.format(LocalDateTime.now()),action);
                PrintWriter out = response.getWriter();
                out.print("successdetele");
                out.flush();
            }
        }
    }
    public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException {
        doGet(request,response);
    }
}