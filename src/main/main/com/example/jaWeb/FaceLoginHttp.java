package com.example.jaWeb;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@WebServlet("/FaceLoginHttp")

public class FaceLoginHttp extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String FLusername=(String) request.getSession().getAttribute("FLusername");
        String Lurl_60=(String) request.getSession().getAttribute("FLurl");
        //获取到数据库的用户对于url
        String Lurl_5=null;
        try {
           Lurl_5= JDBC.getFace(FLusername);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
//        String Lurl_51=(String) request.getSession().getAttribute("FLurl_1");
        System.out.println(FLusername+","+Lurl_60+","+Lurl_5);

        // Python 服务的 URL
        String pythonUrl = "http://localhost:5000/execute_verification";

        // 创建 URL 对象
        URL url = new URL(pythonUrl);

        // 打开连接
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        // 设置请求方法为 POST
        connection.setRequestMethod("POST");

        // 启用输入和输出流
        connection.setDoOutput(true);

        // 发送参数

        try (DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream())) {
            outputStream.writeBytes("param1=" + Lurl_60 + "&param2=" + Lurl_5);
        }

        // 获取响应
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
            StringBuilder FResponse = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                FResponse.append(line);
            }

            System.out.println("Result from Python: " + FResponse.toString());
            // 找到冒号后的字符串
            int colonIndex = FResponse.toString().indexOf(":");
            if (colonIndex != -1) {
                // 提取冒号后的部分（包括冒号本身）
                String resultSubstring = FResponse.toString().substring(colonIndex + 1);
                // 去除空格和其他非数字、字母的字符
                String cleanedResult = resultSubstring.replaceAll("[^a-zA-Z0-9]", "");
                // 输出提取的值
                System.out.println("Result Value: " + cleanedResult);

                if("true".equals(cleanedResult)){
                    request.getSession().setAttribute("userlogin",FLusername);
                    //向前端发送
                    PrintWriter out=response.getWriter();
                    out.print("successuser");
                    out.flush();
                    //执行数据库操作
//                    try {
//                        JDBC.getFace(FLusername);
//                    } catch (Exception e) {
//                        throw new RuntimeException(e);
//                    }
                }else{
                    //向前端发送
                    PrintWriter out=response.getWriter();
                    out.print("fail!");
                    out.flush();
                }

            }
        } finally {
            // 断开连接
            connection.disconnect();
        }
    }
    public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException {
        doGet(request,response);
    }
}
