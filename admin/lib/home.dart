import "package:flutter/material.dart";
import "package:functional_widget_annotation/functional_widget_annotation.dart";

class Home extends StatelessWidget {
  const Home({super.key});

  @widget
  Widget listBtn(String title, String description) => Container(
      width: double.infinity,
      decoration: const BoxDecoration(
          border: Border(bottom: BorderSide(color: Colors.black))),
      child: Padding(
          padding: const EdgeInsets.all(10),
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(title,
                style:
                    const TextStyle(fontSize: 18, fontWeight: FontWeight.w500)),
            Padding(
                padding: const EdgeInsets.only(top: 5),
                child: Text(description,
                    style: const TextStyle(
                        fontSize: 15, fontWeight: FontWeight.normal)))
          ])));

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: "Home",
        theme: ThemeData.dark(),
        home: Scaffold(
            appBar: AppBar(title: const Text("Darkcak Admin")),
            body: Column(children: [
              listBtn("Reports", "Laporan atau keluhan para user"),
              listBtn("Admins", "Akun-akun admin"),
              listBtn("Users", "Akun-akun user"),
              listBtn("Posts", "Postingan-postingan user"),
              listBtn("Log out", "Log out dari aplikasi")
            ])));
  }
}
