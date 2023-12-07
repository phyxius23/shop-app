import { Product } from "@/model/product";
import { pb } from "@/pocketbase";

export function get() {
   return pb.collection('products').getList<Product>();
}

export function remove(productId: string) {
   return pb.collection('products').delete(productId)
}

export function add(product: Partial<Product>) {
   return pb.collection('products').create<Product>(product);
}

export function edit(product: Partial<Product>) {
   return pb.collection('products').update<Product>(product.id!, product);
}