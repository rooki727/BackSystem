package com.example.jaWeb;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/getComment")
public class getComment extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        StringBuffer str=JDBC.getCommentdata();
        response.setContentType("text/html;charset=UTF-8");
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
