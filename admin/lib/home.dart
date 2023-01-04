import 'package:admin/admins.dart';
import "package:flutter/material.dart";
import "package:functional_widget_annotation/functional_widget_annotation.dart";
import "admins.dart";

class Home extends StatelessWidget {
  const Home({super.key});

  @widget
  Widget listBtn(String title, String description, BuildContext context,
          Widget Function() createPage) =>
      GestureDetector(
          onTap: () {
            Navigator.of(context)
                .push(MaterialPageRoute(builder: (context) => createPage()));
          },
          child: Container(
              width: double.infinity,
              decoration: const BoxDecoration(
                  border: Border(bottom: BorderSide(color: Colors.black))),
              child: Padding(
                  padding: const EdgeInsets.all(10),
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(title,
                            style: const TextStyle(
                                fontSize: 18, fontWeight: FontWeight.w500)),
                        Padding(
                            padding: const EdgeInsets.only(top: 5),
                            child: Text(description,
                                style: const TextStyle(
                                    fontSize: 15,
                                    fontWeight: FontWeight.normal)))
                      ]))));

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text("Home")),
        body: Column(children: [
          listBtn("Admins", "Akun-akun admin", context, () => const Admins())
        ]));
  }
}
