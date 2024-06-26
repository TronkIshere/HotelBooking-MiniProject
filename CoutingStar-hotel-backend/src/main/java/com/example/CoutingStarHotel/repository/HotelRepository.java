package com.example.CoutingStarHotel.repository;

import com.example.CoutingStarHotel.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
    @Query("SELECT distinct h FROM Hotel h WHERE h.city = :city")
    List<Hotel> findAllHotelsByCity(@Param("city") String city);
}
