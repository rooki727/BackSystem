package com.example.jaWeb.servlet;

import com.example.jaWeb.Dao.JDBC;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
//        String code= (String) request.getSession().getAttribute("piccode");          //CodeServlet生成的验证码
//        String checkCode = request.getParameter("code");                       //用户输入的验证码
        String account = request.getParameter("username");           //输入的账号
        String password = request.getParameter("password");           //输入的密码
        String action=request.getParameter("action");      //操作
        HttpSession hs=request.getSession();
        try {
                if (JDBC.isPlayer(account) && password.equals(JDBC.getPlayerPassword(account))) {
                    String str="successuser";
                    response.getWriter().write(str);
                    hs.setAttribute("userlogin",account);
                    DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss");
                    JDBC.WritePlayer(account,dateTimeFormatter.format(LocalDateTime.now()),action);
                }
                else if(JDBC.isAdminer(account)&&password.equals(JDBC.getAdminerPassword(account))){
                    String str="successadmin";
                    response.getWriter().write(str);
                    hs.setAttribute("userlogin",account);
                    DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss");
                    JDBC.WriteAdminer(account,dateTimeFormatter.format(LocalDateTime.now()),action);
                }
                else{
                    response.getWriter().write("false");
                }


        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
        doGet(request,response);
    }
}