package com.example.jaWeb;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Base64;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/SaveImageServlet")
public class SaveImageServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request,HttpServletResponse response) throws  IOException {
        response.addHeader("Access-Control-Allow-Origin", "*");
        String[] faces = request.getParameterValues("faces");
        System.out.println(faces);
        if (faces != null && faces.length > 0) {
            for (int i = 0; i < faces.length; i++) {
                saveImage(faces[i], "face_" + i + ".jpg");
            }
            if (faces != null && faces.length > 0) {
                PrintWriter out = response.getWriter();
                out.print("registered");
                out.flush();
            } else {
                PrintWriter out = response.getWriter();
                out.print("false");
                out.flush();
            }
        }
        PrintWriter out = response.getWriter();
                out.print("false");
                out.flush();
    }


    public void saveImage(String base64Data, String fileName) {
        try {
            // 解码Base64数据
            byte[] data = Base64.getDecoder().decode(base64Data.split(",")[1]);

            // 保存图像到服务器本地文件
            String imagePath = "D:/study/facePict/" + fileName;
            try (OutputStream stream = new FileOutputStream(imagePath)) {
                stream.write(data);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @Override
    public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException {
        doGet(request,response);
    }
}








//@WebServlet("/saveImage")
//public class SaveImageServlet extends HttpServlet {
//    protected void doPost(HttpServletRequest request, HttpServletResponse response)
//            throws ServletException, IOException {
////        String action = request.getParameter("action");
////        response.addHeader("Access-Control-Allow-Origin", "*");
////        if ("faceregister".equals(action)) {
//
//        String[] faces = request.getParameterValues("faces");
//        String result = "false";
//        if (faces != null) {
////        if (faces != null && faces.length > 0) {
//            for (int i = 0; i < faces.length; i++) {
////            saveImage(faces[i], "face_" + i + ".jpg");
////            result = "registered";
//                System.out.println(faces[i]);
//            }
//        }else {
//            PrintWriter out=response.getWriter();
//                out.print("registered");
//                out.flush();
//        }
////            } else {
////                PrintWriter out=response.getWriter();
////                out.print("false");
////                out.flush();
//
//
//
//    PrintWriter out = response.getWriter();
//        out.print(result);
//        out.flush();
//}
//
//
//    private void saveImage(String base64Data, String fileName) {
//        try {
//            // 解码Base64数据
//            byte[] data = Base64.getDecoder().decode(base64Data.split(",")[1]);
//
//            // 保存图像到服务器本地文件
//            String imagePath = "D:/study/facePict/" + fileName;
//            try (OutputStream stream = new FileOutputStream(imagePath)) {
//                stream.write(data);
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
//}
