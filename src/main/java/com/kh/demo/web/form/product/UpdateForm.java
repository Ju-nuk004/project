package com.kh.demo.web.form.product;

import lombok.Data;

@Data
public class UpdateForm {
  private Long productId;
  private String pname;
  private String quantity;
  private String price;
}
