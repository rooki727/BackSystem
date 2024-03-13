package com.example.jaWeb;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@WebServlet("/FaceRegisterHttp")

public class FaceRegisterHttp extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String Fusername=(String) request.getSession().getAttribute("FRusername");
        String url_60=(String) request.getSession().getAttribute("FRurl");
        String url_5=(String) request.getSession().getAttribute("FRurl_1");
        System.out.println(Fusername+","+url_60+","+url_5);
//        try {
//            JDBC.insertFace(Fusername,url_5);
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
        // Python 服务的 URL
        String pythonUrl = "http://localhost:5001/execute_extraction";

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
            outputStream.writeBytes("param1=" + url_60 + "&param2=" + url_5);
        }

        // 获取响应
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
            StringBuilder PResponse = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                PResponse.append(line);
            }

            System.out.println("Result from Python: " + PResponse.toString());
            // 找到冒号后的字符串
            int colonIndex = PResponse.toString().indexOf(":");
            if (colonIndex != -1) {
                // 提取冒号后的部分（包括冒号本身）
                String resultSubstring = PResponse.toString().substring(colonIndex + 1);
                // 去除空格和其他非数字、字母的字符
                String cleanedResult = resultSubstring.replaceAll("[^a-zA-Z0-9]", "");
                // 输出提取的值
                System.out.println("Result Value: " + cleanedResult);

                if("true".equals(cleanedResult)){
                    //向前端发送
                    PrintWriter out=response.getWriter();
                    out.print("successregister");
                    out.flush();
                    //执行数据库操作
                    try {
            JDBC.insertFace(Fusername,url_5);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
                }
                else{
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
