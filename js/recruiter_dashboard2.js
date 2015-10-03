 var user_id , companyname , pagetype="";
var page = 1;
var searchlist="";

$(document).ready(function(){
	   if(!localStorage.userId)
			{
			  window.location="index.html";
			}
		else{
	         user_id= localStorage.userId;
	         companyname= localStorage.username;
			 $("#Id").val(user_id);
			
			 $.extend($.mobile.pagination.prototype.options, {perPage: 10});
			 $('#user').html(companyname);
				getCount();

				//*****ON done typening ******/
			
			$('#posted_job_text').donetyping(function(){
            $("#jobs_list").empty();
			var name = $("#posted_job_text").val();
			var search_term =name;
			$.mobile.pagination.prototype.search(search_term,window[searchlist]);
			});	

			$('#saved_job_text').donetyping(function(){
			$("#saved_jobs_list").empty();
			var name = $("#saved_job_text").val();
			var search_term =name;
			$.mobile.pagination.prototype.search(search_term,window[searchlist]);
			});

			$('#applied_job_text').donetyping(function(){
			$("#job_applied_list").empty();
			var name = $("#applied_job_text").val();
			var search_term =name;
			$.mobile.pagination.prototype.search(search_term,window[searchlist]);
			});

			$('#candidate_name_text').donetyping(function(){
			$("#appliedCandidate_list").empty();
			var name = $("#candidate_name_text").val();
			var search_term =name;
			$.mobile.pagination.prototype.search(search_term,window[searchlist]);
			});
	}
			$("#jobs_post").validate({
				
				rules: {
					job_jt_type:{
						required:true
					},
					job_cmpny_id:{
						required:true
					},
					job_title:{
						required:true
					},
					job_description:{
						required:true
					},
					job_keywords:{
					     required:true
					},
					job_location:{
						required:true
					},

					job_UG_qualification:{
						required:true
					},

					job_candidate_profile:{
						required:true
					},

					job_about_company:{
						required:true
					}	
					
				},
				messages: {
					job_jt_type:{
						required:"Please select Job Type."
					},
					job_cmpny_id:{
						required:"Please Select Company."
					},
					job_title:{
						required:"Please Enter Title."
					},
					job_description:{
						required:"Please Enter Description."
					},
					job_keywords:{
					     required:"Please Enter Key Skills."
					},
					job_location:{
						required:"Please Enter Location."
					},

					job_UG_qualification:{
						required:"Please Select Qualification"
					},

					job_candidate_profile:{
						required:"Please Enter Candidate Profile."
					},

					job_about_company:{
						required:"Please Enter Company Profile."
					}	
				},
				errorPlacement: function( error, element ) {
							error.insertAfter( element.parent() );
					},
				submitHandler: function (form) {
           			}						
				
				});
						
		});//document ready Close 
		
		
		//****** on scroll******//
			
			$(document).on("scrollstart","#jobs_list",function(){
				
	        $.mobile.pagination.prototype.setoffset(page);
			$.mobile.pagination.prototype.onclick_next(page,window[searchlist]);
			page++;
			
			});

			$(document).on("scrollstart","#saved_jobs_list",function(){

	       	$.mobile.pagination.prototype.setoffset(page);
			$.mobile.pagination.prototype.onclick_next(page,window[searchlist]);
			page++;
			
			});

			$(document).on("scrollstart","#job_applied_list",function(){
				
	       	$.mobile.pagination.prototype.setoffset(page);
			$.mobile.pagination.prototype.onclick_next(page,window[searchlist]);
			page++;
			
			});

			$(document).on("scrollstart","#appliedCandidate_list",function(){
				
	       	$.mobile.pagination.prototype.setoffset(page);
			$.mobile.pagination.prototype.onclick_next(page,window[searchlist]);
			page++;
			
			});
		
		
		// SET QUALIFICATION
         function set_qualifiaction(){
			//alert(data);
			
			$.ajax({
					type : "GET",
					url  : base_url+"qualificatonlist",
					cache: false,
					dataType:'json',
					success:function(data){
						
								$('select#job_UG_qualification').empty(); 
								$('select#job_PG_qualification').empty(); 
								$('select#job_qualification_other').empty();   
				
								$('select#edit_job_UG_qualification').empty();   
								$('select#edit_job_job_PG_qualification').empty();   
								$('select#edit_job_qualification_other').empty();   
				
								$('select#job_UG_qualification').append('<option value=""></option>');
								$('select#job_PG_qualification').append('<option value=""></option>');
								$('select#job_qualification_other').append('<option value=""></option>');
				
								$('select#edit_job_UG_qualification').append('<option value=""></option>');
								$('select#edit_job_job_PG_qualification').append('<option value=""></option>');
								$('select#edit_job_qualification_other').append('<option value=""></option>');
				
						$.each(data,function(i,item) {	
									if(item.quali_type=="UG")	{
				 		
									$('select#job_UG_qualification').append('<option value="'+item.quali_name+'">'+item.quali_name+'</option>');
									$('select#edit_job_UG_qualification').append('<option value="'+item.quali_name+'">'+item.quali_name+'</option>');
								}
								else if(item.quali_type=="PG"){
									$('select#job_PG_qualification').append('<option value="'+item.quali_name+'">'+item.quali_name+'</option>');
									$('select#edit_job_PG_qualification').append('<option value="'+item.quali_name+'">'+item.quali_name+'</option>');
								}
								else if(item.quali_type=="D")
									{
										$('select#job_qualification_other').append('<option value="'+item.quali_name+'">'+item.quali_name+'</option>');
										$('select#edit_job_qualification_other').append('<option value="'+item.quali_name+'">'+item.quali_name+'</option>');
									}
							});
				
						
					},
					error:function(){alert('error');}
				});
				
		}
		
	//pageshowbefore for post Job//
	$(document).on("pagebeforeshow","#post_job",function(){
		$("#user_id").val(user_id);
		//alert(user_id);
		$("#job_cmpny_name").val(companyname);
		set_jobtype();
		set_qualifiaction();
	});
	
	
//*******  dropdown list Job type ****////	

function set_jobtype(){
			$.ajax({
					type : "GET",
					url  : base_url+"jobtypes",
					cache: false,
					dataType:'json',
					success:function(data){
					$("#job_jt_type").empty();
					$("#edit_job_jt_type").empty();
					$("#job_jt_type").append("<option></option>");
					$("#edit_job_jt_type").append("<option></option>");
					$.each(data,function(i,item) 
					{  
					$("#job_jt_type").append("<option value="+item.Id+">"+item.jt_type+"</option>");
					
					$("#edit_job_jt_type").append("<option value="+item.Id+">"+item.jt_type+"</option>");
								
					});
					},
					error:function(){alert('error');}
				});
				}
				
	
		
		 
		
		
	////***POST jobs***////
		$(document).on('click','#postjob',function(){
			var valid =	$("#jobs_post").valid();
			  if(valid) {
						var formdata = $("#jobs_post").serialize();
						formdata=formdata+"&job_status=P";
						$.ajax({
							type:"GET",
							url:base_url+"jobs/create",
							cache: false,
							data:formdata,
							dataType:"json",
							success:function(data)
							{  
                                if(data==1){
							    $('input').not('[type="button"]').val(''); 
								$('#job_jt_type').val('').selectmenu('refresh');
								$('#job_cmpny_id').val('').selectmenu('refresh');
								$('#job_min_exp').val('').selectmenu('refresh');
								$('#job_max_exp').val('').selectmenu('refresh');
								$('#job_min_ctc').val('').selectmenu('refresh');
								$('#job_max_ctc').val('').selectmenu('refresh');
								$('#job_UG_qualification').val('').selectmenu('refresh');
								$('#job_PG_qualification').val('').selectmenu('refresh');
								$('#job_qualification_other').val('').selectmenu('refresh');
								$('#jobs_reg input[type="radio"]').prop('checked', false).checkboxradio("refresh");
								$('#job_description').val('');
								$('#job_candidate_profile').val('');
								$('#job_about_company').val('');
								jobs_list("posted");
								window.location.hash="#posted_jobs";
								}
							},
							error: function(){alert("error");}  
							});

						}
						
				
				});
				
				
	//Save Job //
	
	$(document).on('click','#savejob',function(){
			var valid =	$("#jobs_post").valid();
			  if(valid) {
						var formdata = $("#jobs_post").serialize();
						formdata=formdata+"&job_status=S";
						$.ajax({
							type:"GET",
							url:base_url+"jobs/create",
							cache: false,
							data:formdata,
							dataType:"json",
							success:function(data)
							{  if(data==1){
                                $('input').not('[type="button"]').val(''); 
								$('#job_jt_type').val('').selectmenu('refresh');
								$('#job_cmpny_id').val('').selectmenu('refresh');
								$('#job_min_exp').val('').selectmenu('refresh');
								$('#job_max_exp').val('').selectmenu('refresh');
								$('#job_min_ctc').val('').selectmenu('refresh');
								$('#job_max_ctc').val('').selectmenu('refresh');
								$('#job_UG_qualification').val('').selectmenu('refresh');
								$('#job_PG_qualification').val('').selectmenu('refresh');
								$('#job_qualification_other').val('').selectmenu('refresh');
								$('#jobs_reg input[type="radio"]').prop('checked', false).checkboxradio("refresh");
								$('#job_description').val('');
								$('#job_candidate_profile').val('');
								$('#job_about_company').val('');
								jobs_list("saved");
								window.location.hash="#saved_jobs";
								}
							},
							error: function(){alert("error");} 
							
							});

					}
					 
				  
				
				});
		
			
       // toggle Div  on click//
		$(document).on("click",'#Jobs',function(){
			$("#jobType").toggleClass("hidden");
			$("#Jobs").toggleClass("ui-icon-carat-d");
			$("#Jobs").toggleClass("ui-icon-carat-u");
		     //jobs_list()
		});
		
		//*****ON CLICK OF Posted job(listing)*****///
		$(document).on("click",'.posted',function(){
			 //$("#jobType").toggleClass("hidden");
			pageinit();
		    jobs_list("posted");
			 pagetype="posted_jobs";
			 window.location.hash='#posted_jobs';
		});
		
		
   //*****ON CLICK OF Saved job(listing)*****///
		$(document).on("click",'.saved',function(){
			//$("#jobType").toggleClass("hidden");
			pageinit();
			 jobs_list("saved");
			  pagetype="saved_jobs";
			 window.location.hash='#saved_jobs';
			});
			
		
	//*****ON CLICK OF Saved job(listing)*****///
		$(document).on("pageinit",'#job_applied',function(){
			$("#jobType").toggleClass("hidden");
			 pagetype="job_applied";
             searchlist="job_applied_list";
			 job_applied_list(page);
			 
			});	
		
		    function jobs_list(type){
			
				if(type=="posted")
					{
                        searchlist="postedJobs";
						$("#jobs_list").empty();
						postedJobs(page);
						page=2;
					}	
					
					else if(type=="saved")
					{
						searchlist="savedJobs";
						$("#saved_jobs_list").empty();
						savedJobs(page);
						page=2;
					}
				}
		
		// saved job list//
		function savedJobs(page)
		{
			$.ajax({
			type:"GET",
			url:base_url+"savedjoblist/"+user_id,
			data:{ pagination: $.mobile.pagination.prototype.getResults() },
			async: "true",
			cache: false,
			dataType:"json",
			success: function(data){
					$("#saved_jobs_list").empty();
					$.each(data.savedjoblist,function(i,item) 
					{
						$("#saved_jobs_list").append("<li Id="+item.Id+"><a href='#' class='view_profile' data-ajax='false'>"+item.job_title+	"</b><br><p>"+item.job_location+"</p></a></li>");
						$('#saved_jobs_list li').append("<a href='#'class='job_delete ui-btn ui-btn-b ui-btn-icon-notext ui-icon-trash-o'></a>");
						$("#saved_jobs_list").listview('refresh');
					});
							
		},
				error: function(){
					alert("error");
					}  
							});	
		}
		
		//posted job list//
		function postedJobs(page)
		{
				$.ajax({
						type:"GET",
						url:base_url+"postedjoblist/"+user_id,
					    data:{ pagination: $.mobile.pagination.prototype.getResults() },
						async: "true",
						cache: false,
						dataType:"json",
						success: function(data){
							
							$.each(data.postedjoblist,function(i,item) 
							{
								$("#jobs_list").append("<li Id="+item.Id+"><a href='#' class='view_profile' data-ajax='false'>"+item.job_title+	"</b><br><p>"+item.job_location+"</p></a></li>");
								$('#jobs_list li').append("<a href='#'class='job_delete ui-btn ui-btn-b ui-btn-icon-notext ui-icon-trash-o'></a>");
								$("#jobs_list").listview('refresh');
							});
												
		     },
				error: function(){
					alert("error");
					}  
							});	
		}

		 
		
	
	// applied job list//
 function job_applied_list(){
     var Id=$("#Id").val();
	   $.ajax({
				type:"GET",
				url:base_url+"joblist/"+Id,
				data:{ pagination: $.mobile.pagination.prototype.getResults() },
				async: "true",
				cache: false,
				dataType:"json",
				success: function(data){
					$("#job_applied_list").empty();
					$.each(data.joblist,function(i,item) 
					{         var count = 0;
							   if(item.job_applied!=""){
								var job_applied = item.job_applied;
								var appliedids = job_applied.split('|');
								count = appliedids.length;
							    }
								$("#job_applied_list").append("<li Id="+item.Id+"  data="+item.job_applied+"><a class='list_applied'>"+item.job_title+"</b><br><p>Applied :"+count+"</p></a></li>");
							

				    $("#job_applied_list").listview('refresh');
					});	
				},
				error: function(){alert("error");}  
			});	
	   
	   
   }
   var job_applied;
   	//onclick navigate to candidate list applied for perticular  job//
	$(document).on("click",'.list_applied',function(){
			job_applied = $(this).parent("li").attr('data');
			//alert(job_applied);
			searchlist="candy_list";
		    candy_list(page);
			pagetype="candylist";
		    window.location.hash="#candylist";
			});
   
	// create candidate list //
    function candy_list(page){
	    $.ajax({
				type:"GET",
				url:base_url+"jobappliedlist/"+job_applied,
				async: "true",
				cache: false,
				dataType:"json",
				data:{ pagination: $.mobile.pagination.prototype.getResults() },
				success: function(data){
				$("#appliedCandidate_list").empty();
					$.each(data.jobappliedlist,function(value,item){
						
						$("#appliedCandidate_list").append("<li id="+item.Id+" ><a class='candy_profile'>"+item.usr_name+"</a></li>");
					
						
					});
					$("#appliedCandidate_list").listview('refresh');
				},
				error: function(){ alert("error");}  
			});	
	   
   }
    
   //shows the candidate profile info //
   	$(document).on("click",'.candy_profile',function(){
			var js_id  = $(this).parent("li").attr('id');
			
		    candy_profile(js_id);
		    window.location.hash="#candyProfile";
			});
			
   function candy_profile(js_id){
	   $.ajax({
				type:"GET",
				url:base_url+"jsprofile/"+js_id,
				async: "true",
				cache: false,
				dataType:"json",
				success: function(data){
							
					$("#basicInfo").empty();
					$("#Qual").empty();
					$("#skills").empty();
				    $("#resume").empty();
					$.each(data,function(value,item){
					$("#basicInfo").html("Name: "+item.js_name+"<br/>"+
					                     "DOB: "+item.js_dob+"<br/>"+
										 "Mobile"+item.js_mobile+"<br/>"+
										 "Experience &nbsp;&nbsp;"+item.js_exp_month+"Month-"+item.js_exp_yr+"Years<br/>"+
										 "Location: Current:"+item.js_city+"&nbsp;&nbsp;&nbsp; preferred:"+item.js_pref_location+"</br>");
					$("#Qual").html("Graduation : &nbsp;"+item.js_basic_edu+"<br/>"+
									"Masters : &nbsp;"+item.js_master_edu+"<br/>"+
									"Doctorate : &nbsp;"+item.js_doc_edu+"<br/>"+
									"Certification : &nbsp; "+item.js_cert1+" "+item.js_cert2+" "+item.js_cert3);
									
					$("#skills").html("Key Skills :&nbsp; "+item.js_keyskills+"<br/>");
				    $("#resume").html("&nbsp; <a>"+item.js_resume_head+"</a> Click to Download");
					
					
					});
				},
				error: function(){
					alert("error");
					}  
			});	
	   
   }
		
	////****FOR VIEWING THE JOB PROFILE***/////
		$(document).on('click', '.view_profile', function(){   	
			var listitem = $( this ).parent("li");
	 		var jobs_Id = listitem.attr('Id');
		    viewProfile(jobs_Id);
		});
		
		
		
	function viewProfile(id){
		
				$.ajax({
				type:"GET",
				url:base_url+"jobs/"+id+"/edit",
				cache:false,
				dataType:"json",
				success:function sucess(data){
					$.each(data,function(value,item){
					$("#edit").attr("data-id",item.Id);
				    $("#job_basic").empty();
					$("#job_basic").append("<li id="+item.Id+"><b>Job Title: </b>"+item.job_title+"</li>");
					$("#job_basic").append("<li id="+item.Id+"><b>Company Name: </b>"+item.job_cmpny_name+"</li>");
					$("#job_basic").append("<li id="+item.Id+"><b>Job Type: </b>"+item.jt_type+"</li>");
					//$("#job_basic").listview('refresh');
					
					$("#job_desc").empty();
					$("#job_desc").append("<li id="+item.Id+"><b>Key Skills: </b>"+item.job_keywords+"</li>");
					$("#job_desc").append("<li id="+item.Id+"><b>Job Description: </b>"+item.job_description+"</li>");
					$("#job_desc").append("<li id="+item.Id+"><b>Location: </b>"+item.job_location+"</li>");
					$("#job_desc").append("<li id="+item.Id+"><b>Experience: </b>"+item.job_min_exp+"-"+item.job_max_exp+" yrs.</li>");
					//$("#job_desc").listview('refresh');
					
					$("#job_candt_profile").empty();
					$("#job_candt_profile").append("<li id="+item.Id+"><br>"+item.job_candidate_profile+"</li>");
					//$("#job_candt_profile").listview('refresh');
					
					$("#comp_profile").empty();
					$("#comp_profile").append("<li id="+item.Id+"><br>"+item.job_about_company+"</li>");
					
					if(item.job_status=="S"){
						$("#postbtn").removeClass("hidden");
						$("#postthis").attr("data-id",item.Id);
						
						}
					else{
						
						$("#postbtn").addClass("hidden");
					}
					//$("#comp_profile").listview('refresh');
			       	 window.location.hash = "#job_profile";
					});			
				},								
				error:function(){
					alert("error");
				}		
			});///AJAX CLOSE
		
		
	}
		
	
	////****EDIT JOB ***/////
			$(document).on('click', '#edit', function(){  
				var job_id = $(this).attr("data-id");		
				set_jobtype();
				set_qualifiaction();
				set_edit(job_id);
				window.location.hash="#edit_job";
				
		});
				
				
	function set_edit(id){
		$.ajax({
				type:"GET",
				url:base_url+"jobs/"+id+"/edit",
				cache:false,
				dataType:"json",
				success:function sucess(data){
					$.each(data,function(value,item){
			  			$("#edit_Id").val(item.Id);
						$("#edit_job_jt_type").val(item.job_jt_type).selectmenu('refresh');
						$("#edit_job_cmpny_id").val(item.job_cmpny_id).selectmenu('refresh');
						$("#edit_job_title").val(item.job_title);
						$("#edit_job_description").val(item.job_description);
						$("#edit_job_keywords").val(item.job_keywords);
						$("#edit_job_min_exp").val(item.job_min_exp).selectmenu('refresh');
						$("#edit_job_max_exp").val(item.job_max_exp).selectmenu('refresh');
						$("#edit_job_ctc_type").val(item.job_ctc_type).selectmenu('refresh');
						$("#edit_job_min_ctc").val(item.job_min_ctc).selectmenu('refresh');
						$("#edit_job_max_ctc").val(item.job_max_ctc).selectmenu('refresh');
						if(item.job_ctc_hide == 1){
						$("#edit_job_ctc_hide_yes").prop("checked",true).checkboxradio("refresh");
						$("#edit_job_ctc_hide_no").prop("checked",false).checkboxradio("refresh");
				
						}else{
						$( "#edit_job_ctc_hide_yes" ).prop("checked",false).checkboxradio("refresh");
						$( "#edit_job_ctc_hide_no" ).prop("checked",true).checkboxradio("refresh");
				        }
						$("#edit_job_ctc_other").val(item.job_ctc_other);
						$("#edit_job_no_of_vacancy").val(item.job_no_of_vacancy);
						$("#edit_job_location").val(item.job_location);
						$("#edit_job_UG_qualification").val(item.job_UG_qualification).selectmenu('refresh');
						$("#edit_job_PG_qualification").val(item.job_PG_qualification).selectmenu('refresh');
						$("#edit_job_qualification_other").val(item.job_qualification_other).selectmenu('refresh');
						$("#edit_job_candidate_profile").val(item.job_candidate_profile);
						$("#edit_job_about_company").val(item.job_about_company);
						
					});			
				},
				error:function(){
					alert("error");
				}
			});	
	}
			////***ON CLICK THE update jobs BUTTON***////
			$(document).on('click', '#update', function(){ 
			$("#job_edit_form").validate({
			    rules: {
					edit_job_jt_type:{
						required:true
					},
					edit_job_cmpny_id:{
						required:true
					},
					edit_job_title:{
						required:true
					},
					edit_job_description:{
						required:true
					},
					edit_job_keywords:{
					     required:true
					},
					edit_job_location:{
						required:true
					},

					edit_job_UG_qualification:{
						required:true
					},

					edit_job_candidate_profile:{
						required:true
					},

					edit_job_about_company:{
						required:true
					}	
				},
				messages: {
					edit_job_jt_type:{
						required:"Please select Job Type."
					},
					edit_job_cmpny_id:{
						required:"Please Select Company."
					},
					edit_job_title:{
						required:"Please Enter Title."
					},
					edit_job_description:{
						required:"Please Enter Description."
					},
					edit_job_keywords:{
					     required:"Please Enter Key Skills."
					},
					edit_job_location:{
						required:"Please Enter Location."
					},

					edit_job_UG_qualification:{
						required:"Please Select Qualification"
					},

					edit_job_candidate_profile:{
						required:"Please Enter Candidate Profile."
					},

					edit_job_about_company:{
						required:"Please Enter Company Profile."
					}	
				},
				errorPlacement: function( error, element ) {
							error.insertAfter( element.parent() );
					},
				submitHandler: function (form) {
						var id=$("#edit_Id").val();
						var formdata = $("#job_edit_form").serialize();
							$.ajax({
							type:"PUT",
							url:base_url+"jobs/"+id,
							cache:false,
							dataType:"json",
							data:formdata,
							success:function(data){
								 var job_id = $("#edit_Id").val();
								
								 viewProfile(job_id);
								},
							error:function(data){
								alert("error")
							}
						
						});
					}
				});
			});
			
		
	   
	   // post saved jobs//
		 $(document).on("click","#postthis",function(){
			 
			 var id = $(this).attr("data-id");
			// alert(job_id);
			 
			 $.ajax({
						type: "DELETE",
						url: base_url+"jobs/"+id,
						async: "true",
						cache: false,
						dataType:"json",
						data:"job_status=P",
			            success: function(data)
						{
						  // alert(data);
						  if(data=="1"){
							  
							  jobs_list("posted");
							  window.location.hash='#posted_jobs';
						  }
						  else{
							  alert("on updated");
						  }
						}
					});
		 });
		 
		 
	//******Job delete*****//
		$(document).on('click', '.job_delete', function(){   	
			var listitem = $( this ).parent("li");
			var Id =listitem.attr('Id');
			$.alerts.okButton = ' Yes ';
			$.alerts.cancelButton = ' No ';
			jConfirm('Are you sure you want to delete this record?', 'Confirm',function(r) {
                if (r == false)
                {
                   //alert('No Clicked');
                }
                else
                {//alert('Yes Clicked');
					$.ajax({
						type: "DELETE",
						url: base_url+"jobs/"+Id,
						async: "true",
						cache: false,
						dataType:"json",
						data:"job_status=D",
			            success: function(data)
						{
							   listitem.remove();
								
						}
					});
				 }
			});
		});
		
		//*Set user profile fields*//
	
		$(document).on("pagebeforeshow","#edit_profile",function(){
		$("#userId").val(user_id);
		seteditprofile(user_id);	
		});
		
		function seteditprofile(user_id){
			$.ajax({
				type:"GET",
				url:base_url+"editprofile/"+user_id,
				dataType:"json",
				success:function(data){
					$.each(data,function(value,item){
						$("#usr_name").val(item.usr_name);
						$("#usr_email").val(item.usr_mail);
						$("#usr_registerDate").text(item.usr_registerDate);
						$("#usr_lastvisitDate").text(item.usr_lastvisitDate);
					});
					
					
				},
				error:function(){
					alert("error");
				}
				
				
			});
			
		}
		
	$(document).on("click","#saveprofile",function(){
		
		$("#edit_profile_form").validate({
			 rules: {
			    usr_name:{
					
					required:true
				},
				
				usr_email:{
					required:true,
					email:true
					},
					
				usr_password:{
					
				},
				c_password:{
					
					equalTo:usr_password
				}
				
			    	 
			 },
			 errorPlacement: function( error, element ) {
							error.insertAfter( element.parent() );
					},
			submitHandler: function (form) {
			   var formdata = $("#edit_profile_form").serialize();
			   var id=$("#Id").val();
				$.ajax({
					type:"GET",
					url:base_url+"updateprofile/"+id,
					data:formdata,
					success:function(data){
					if(data==1){
							
							window.location.hash="#dashboard";
						}
					},
					error:function(){
						alert("error");
					}
				});
				
           	}	
			
		});
		
		
	});
	//changes pagetype on pagechange//
	$(document).on("pagechange", function (e, data) {
		pagetype = data.toPage[0].id;
		
	});
      
	 //search textfield hide or show on btn click// 
    $(document).on("click",".searchbtn",function(){
		
		var toggleTextbox = "#"+pagetype+" .searchText";
		 var togglebtn ="#"+pagetype+" .searchbtn";
		$(toggleTextbox).toggleClass("hidden");
	    $(togglebtn).toggleClass("ui-icon-search");
		$(togglebtn).toggleClass("ui-icon-arrow-u");
		
	});
	
	//-------Logout -----------//
	$(document).on('click','#logout',function(){
		localStorage.removeItem("userId");
		localStorage.removeItem("username");
	    window.location="index.html";
	});
	
function getCount(){
      var userId=$("#Id").val();
	 $.ajax({
			 type:"GET",
			 url:base_url+"countjobs/"+userId,
			 dataType:"json",
			 success:function(data){
				  $("#postedcount").html(data.posted);
				  $("#savedcount").html(data.saved);
				 
			 },
			 error:function(){alert("error");}
		 });
	 }
	
function pageinit()
{
			page=1;
			$.mobile.pagination.prototype.setoffset(0);
			$.mobile.pagination.prototype.setSearchTerm('');
}