import React from "react";
import { Link } from "react-router-dom";
import "./css/Not.css";

function Not(props) {
  return (
    <section class="page_404">
      <div class="containers">
        <div class="row">
          <div class="col-sm-12 ">
            <div class="col-sm-10 col-sm-offset-1  text-center">
              <div class="four_zero_four_bg">
                <h4 class="text-center">{props.value}</h4>
              </div>

              <div class="contant_box_404">
                <h3 class="h2">Look like you're lost</h3>
                <Link to="/createpost" class="link_404">
                  Add Photo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Not;
