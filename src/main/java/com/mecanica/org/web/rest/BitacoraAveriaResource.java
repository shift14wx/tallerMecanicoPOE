package com.mecanica.org.web.rest;

import com.mecanica.org.domain.BitacoraAveria;
import com.mecanica.org.repository.BitacoraAveriaRepository;
import com.mecanica.org.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mecanica.org.domain.BitacoraAveria}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BitacoraAveriaResource {

    private final Logger log = LoggerFactory.getLogger(BitacoraAveriaResource.class);

    private static final String ENTITY_NAME = "bitacoraAveria";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BitacoraAveriaRepository bitacoraAveriaRepository;

    public BitacoraAveriaResource(BitacoraAveriaRepository bitacoraAveriaRepository) {
        this.bitacoraAveriaRepository = bitacoraAveriaRepository;
    }

    /**
     * {@code POST  /bitacora-averias} : Create a new bitacoraAveria.
     *
     * @param bitacoraAveria the bitacoraAveria to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bitacoraAveria, or with status {@code 400 (Bad Request)} if the bitacoraAveria has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bitacora-averias")
    public ResponseEntity<BitacoraAveria> createBitacoraAveria(@RequestBody BitacoraAveria bitacoraAveria) throws URISyntaxException {
        log.debug("REST request to save BitacoraAveria : {}", bitacoraAveria);
        if (bitacoraAveria.getId() != null) {
            throw new BadRequestAlertException("A new bitacoraAveria cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BitacoraAveria result = bitacoraAveriaRepository.save(bitacoraAveria);
        return ResponseEntity.created(new URI("/api/bitacora-averias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bitacora-averias} : Updates an existing bitacoraAveria.
     *
     * @param bitacoraAveria the bitacoraAveria to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bitacoraAveria,
     * or with status {@code 400 (Bad Request)} if the bitacoraAveria is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bitacoraAveria couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bitacora-averias")
    public ResponseEntity<BitacoraAveria> updateBitacoraAveria(@RequestBody BitacoraAveria bitacoraAveria) throws URISyntaxException {
        log.debug("REST request to update BitacoraAveria : {}", bitacoraAveria);
        if (bitacoraAveria.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BitacoraAveria result = bitacoraAveriaRepository.save(bitacoraAveria);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bitacoraAveria.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bitacora-averias} : get all the bitacoraAverias.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bitacoraAverias in body.
     */
    @GetMapping("/bitacora-averias")
    public List<BitacoraAveria> getAllBitacoraAverias() {
        log.debug("REST request to get all BitacoraAverias");
        return bitacoraAveriaRepository.findAll();
    }

    /**
     * {@code GET  /bitacora-averias/:id} : get the "id" bitacoraAveria.
     *
     * @param id the id of the bitacoraAveria to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bitacoraAveria, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bitacora-averias/{id}")
    public ResponseEntity<BitacoraAveria> getBitacoraAveria(@PathVariable Long id) {
        log.debug("REST request to get BitacoraAveria : {}", id);
        Optional<BitacoraAveria> bitacoraAveria = bitacoraAveriaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bitacoraAveria);
    }

    /**
     * {@code DELETE  /bitacora-averias/:id} : delete the "id" bitacoraAveria.
     *
     * @param id the id of the bitacoraAveria to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bitacora-averias/{id}")
    public ResponseEntity<Void> deleteBitacoraAveria(@PathVariable Long id) {
        log.debug("REST request to delete BitacoraAveria : {}", id);
        bitacoraAveriaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
