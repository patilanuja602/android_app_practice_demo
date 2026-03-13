package com.example.croppricecalculator

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val etQuantity = findViewById<EditText>(R.id.etQuantity)
        val etPrice = findViewById<EditText>(R.id.etPrice)
        val btnCalculate = findViewById<Button>(R.id.btnCalculate)
        val tvResult = findViewById<TextView>(R.id.tvResult)

        btnCalculate.setOnClickListener {
            val quantityStr = etQuantity.text.toString()
            val priceStr = etPrice.text.toString()

            if (quantityStr.isNotEmpty() && priceStr.isNotEmpty()) {
                val quantity = quantityStr.toDouble()
                val price = priceStr.toDouble()
                val total = quantity * price

                var resultText = "Total Price: $total"
                if (total > 10000) {
                    resultText += "\nGood Profit!"
                }
                tvResult.text = resultText
            } else {
                tvResult.text = "Please enter both values"
            }
        }
    }
}
