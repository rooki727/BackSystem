package com.example.jaWeb;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mysql.cj.xdevapi.JsonArray;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/GetEasyServlet")
public class GetEasyServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        StringBuffer str=JDBC.getGoal("easy");
        PrintWriter out=response.getWriter();
        if(str!=null){
            out.print(str.toString());
            out.flush();
        }
    }
    public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException {
        doGet(request,response);
    }
}

