package com.kh.demo.web.req.product;

import lombok.Data;

@Data
public class ResUpdate {
  private Long productId;
  private String pname;
  private String quantity;
  private String price;
}
